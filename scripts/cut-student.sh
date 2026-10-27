#!/usr/bin/env bash
# Cuts the public-domain "Student with question" photo (BLM Alaska, D. Coble) into paper-doll layers.
# Output: src/ui/assets/people/student/{head,torso,upper,fore}.png (cropped canvas, shared origin).
set -euo pipefail
OUT="$(cd "$(dirname "$0")/.." && pwd)/src/ui/assets/people/student"
SRC_URL="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Student_with_question_%2853719529578%29.jpg/1920px-Student_with_question_%2853719529578%29.jpg"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
cd "$TMP"
curl -sfL -A "auditorium-assets/0.1" -o src.jpg "${SRC_URL}" 
magick src.jpg -resize 50% half.jpg
W=960; H=1468
HEAD="700,470 720,430 770,410 830,402 880,420 920,455 935,520 930,590 915,640 890,690 860,705 800,712 750,700 730,670 705,620 690,540"
UPPER="446,655 500,664 590,676 592,760 560,850 500,858 440,850 400,800 350,740 312,695"
FORE="312,695 320,650 345,570 378,480 385,430 383,352 400,330 420,322 445,310 462,306 480,318 492,345 498,375 485,420 480,470 440,520 432,580 428,630 446,655"
TORSO="735,682 650,665 595,670 592,760 560,850 520,862 480,950 462,1100 455,1230 480,1272 600,1300 605,1380 600,1468 960,1468 960,700 860,690"
cut() { # name polygon
  magick -size ${W}x${H} xc:black -fill white -draw "polygon $2" m.png
  magick half.jpg m.png -alpha off -compose CopyOpacity -composite l.png
  magick l.png \( +clone -channel A -morphology Dilate Disk:5 +channel -fill white -colorize 100 \) +swap -compose over -composite \
    -crop 700x1100+260+368 +repage "$OUT/$1.png"
}
mkdir -p "$OUT"
cut head "$HEAD"; cut upper "$UPPER"; cut fore "$FORE"; cut torso "$TORSO"
# Patch the shoulder hole the lowered arm uncovers with a flat scrap of fleece colour.
magick "$OUT/torso.png" -fill "#645355" -draw "polygon 335,304 300,310 255,340 218,395 202,465 262,488 332,392" "$OUT/torso.png"
