/**
 * Unfolds A1B1, A2B2, A3B3 3D lines to 2D lines
 * keeps distances A1B1, A2B2, A3B3, ...
 * keeps distances A1A2, A2A3, A3A4, ...
 * keeps distances B1B2, B2B3, B3B4, ...
 * keeps diagonals B1A2, B2A3, B3AA, ...
 * keeps diagonals like B2A1 only if A1B1 and A2B2 are coplanar
 * all output X > 0, Y > 0
 */
export function unfold(lines) {
  const output = [];
  const A = lines.map((line) => line.A);
  const B = lines.map((line) => line.B);
  output.push({
    A: { x: 0, y: 0 },
    B: { x: distance(A[0], B[0]), y: 0 },
  });
  for (let i = 0; i < lines.length - 1; i++) {
    const a = triangulate(output[i].A, output[i].B, distance(A[i], A[i + 1]), distance(B[i], A[i + 1]));
    const b = triangulate(a, output[i].B, distance(A[i + 1], B[i + 1]), distance(B[i], B[i + 1]));
    output.push({
      A: a,
      B: b,
    });
  }
  const xShift = Math.min(...[...output.map((line) => line.A.x), ...output.map((line) => line.B.x)]);
  const yShift = Math.min(...[...output.map((line) => line.A.y), ...output.map((line) => line.B.y)]);
  return output.map((line) => ({
    A: { x: line.A.x - xShift, y: line.A.y - yShift },
    B: { x: line.B.x - xShift, y: line.B.y - yShift },
  }));
}

/**
 * Returns distance between to points
 */
export function distance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const dz = (p1.z || 0) - (p2.z || 0);
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Triangulation of point X by given A, B and distances AX, BX.
 */
export function triangulate(A, B, AX, BX) {
  if (AX == 0) return A;
  if (BX == 0) return B;
  if (A.y != B.y) {
    const a = A.x,
      b = A.y,
      c = B.x,
      d = B.y,
      t = AX * AX,
      p = BX * BX,
      n = p - (a - c) * (a - c) - (b - d) * (b - d),
      i = (n - t) / (2 * (b - d)),
      k = (c - a) / (b - d),
      D = k * k * t + t - i * i,
      x = (Math.sqrt(D) - i * k) / (k * k + 1) + a,
      y = i + k * (x - a) + b;
    return { x, y };
  } else if (A.x != B.x) {
    const a = A.x,
      b = A.y,
      c = B.x,
      t = AX * AX,
      p = BX * BX,
      n = p - (a - c) * (a - c),
      x = (n - t) / 2 / (a - c) + a,
      y = Math.sqrt(t - (x - a) * (x - a)) + b;
    return { x, y };
  } else {
    throw Error("point A cannot be equal to B");
  }
}
