"""Geometry for the WA hexagon monogram (original design).

A hexagon frame holds one continuous zig-zag stroke: the W's last rise is the A's left leg,
so the two letters share a stroke. Every terminal and turn is cut flat on two horizontals.
Run: python3 design/brand/hex-monogram.py  -> prints path data for lib/brand.ts
"""
import math, json, sys
from shapely.geometry import LineString, Polygon
from shapely.ops import unary_union
from shapely import affinity

W = float(sys.argv[1]) if len(sys.argv) > 1 else 8.5   # stroke weight
R = 46
hexv = [(50 + R*math.cos(math.radians(a)), 50 + R*math.sin(math.radians(a))) for a in (-90,-30,30,90,150,210)]
outer = Polygon(hexv)
inner = Polygon(hexv).buffer(-W, join_style=2)
ring = outer.difference(inner)

# W + A as one zigzag: the W's last rise is the A's left leg.
dx = 4
pts = [(22,32),(31,68),(41,44),(51,68),(61,32),(71,68)]
pts = [(x+dx, y) for x, y in pts]
# extend both ends so the horizontal clip gives flat terminals
def ext(p, q, d=8):
    vx, vy = p[0]-q[0], p[1]-q[1]; L = math.hypot(vx, vy); return (p[0]+vx/L*d, p[1]+vy/L*d)
line = [ext(pts[0], pts[1]), *pts, ext(pts[-1], pts[-2])]
zig = LineString(line).buffer(W/2, join_style=2, mitre_limit=6, cap_style=2)
# trim with horizontal cuts so every terminal and turn is flat
clip = Polygon([(0,32),(100,32),(100,68),(0,68)])
zig = zig.intersection(clip)
# A crossbar (accent), between the A legs
ax0, ay0 = pts[3]; ax1, ay1 = pts[4]; ax2, ay2 = pts[5]
yb = 55.5
def x_on(p, q, y): return p[0] + (q[0]-p[0])*(y-p[1])/(q[1]-p[1])
xl = x_on((ax0,ay0),(ax1,ay1), yb); xr = x_on((ax1,ay1),(ax2,ay2), yb)
bar = Polygon([(xl-2, yb-W*0.36),(xr+2, yb-W*0.36),(xr+2, yb+W*0.36),(xl-2, yb+W*0.36)]).intersection(zig.convex_hull)

def path(geom):
    # orient so holes wind opposite to outlines: renders correctly with the default nonzero fill rule
    from shapely.geometry.polygon import orient
    out = []
    geoms = [orient(g, 1.0) for g in getattr(geom, 'geoms', [geom])]
    for g in geoms:
        for ring_ in [g.exterior, *g.interiors]:
            c = list(ring_.coords)[:-1]
            out.append("M" + " L".join(f"{x:.2f} {y:.2f}" for x, y in c) + " Z")
    return " ".join(out)

# translate to the hexagon's bounding box
minx, miny, maxx, maxy = outer.bounds
t = lambda g: affinity.translate(g, -minx, -miny)
print(json.dumps({"width": round(maxx-minx, 2), "height": round(maxy-miny, 2),
                  "frame": path(t(ring)), "letters": path(unary_union([t(zig), t(bar)]))}, indent=1))
