function minPathSum(grid) {
  const n = grid.length;
  const m = grid[0].length;

  if (grid[0][0] === -1 || grid[n - 1][m - 1] === -1) return "IMPOSIBLE";

  // Crear DP array con objetos { cost, path }
  const dp = Array.from({ length: n }, () => Array(m).fill(null));

  dp[0][0] = { cost: grid[0][0], path: [[0, 0]] };

  // Primera fila
  for (let j = 1; j < m; j++) {
    if (grid[0][j] === -1 || dp[0][j - 1].cost === Infinity) {
      dp[0][j] = { cost: Infinity, path: [] };
    } else {
      dp[0][j] = {
        cost: dp[0][j - 1].cost + grid[0][j],
        path: [...dp[0][j - 1].path, [0, j]],
      };
    }
  }

  // Primera columna
  for (let i = 1; i < n; i++) {
    if (grid[i][0] === -1 || dp[i - 1][0].cost === Infinity) {
      dp[i][0] = { cost: Infinity, path: [] };
    } else {
      dp[i][0] = {
        cost: dp[i - 1][0].cost + grid[i][0],
        path: [...dp[i - 1][0].path, [i, 0]],
      };
    }
  }

  // Resto de la matriz
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (grid[i][j] === -1) {
        dp[i][j] = { cost: Infinity, path: [] };
      } else {
        const fromTop = dp[i - 1][j];
        const fromLeft = dp[i][j - 1];

        if (fromTop.cost < fromLeft.cost) {
          dp[i][j] = {
            cost: grid[i][j] + fromTop.cost,
            path: [...fromTop.path, [i, j]],
          };
        } else {
          dp[i][j] = {
            cost: grid[i][j] + fromLeft.cost,
            path: [...fromLeft.path, [i, j]],
          };
        }
      }
    }
  }

  const result = dp[n - 1][m - 1];
  return result.cost === Infinity ? "IMPOSIBLE" : result;
}

// Ejemplo de uso
const grid = [
  [1, 3, 1, 2, 4],
  [1, -1, 2, -1, 1],
  [4, 2, 1, 3, 2],
  [2, -1, 3, 1, 1],
  [1, 2, 2, -1, 1],
];

const result = minPathSum(grid);
console.log(result);
/*SALIDA ESPERADA:
  {
    cost: 14,
    path: [
      [0,0],[0,1],[0,2],[1,2],[2,2],[2,3],[2,4],[3,4],[4,4]
    ]
  }*/
