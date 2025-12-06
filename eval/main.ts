import { runEvalite } from "evalite/runner";

// Epoch timestampt
const timestamp = Date.now();

// Path to eval
const path = "benchmark/enkokilish_bench.eval.ts";

// Path to result export
// to save full result run in run-once-and-exit mode
const outputPath = `results/result-${timestamp}.json`;

// modes:
//    "watch-for-file-changes" - Development Mode with watch,
//    "run-once-and-exit" - CI/CD Mode,
//    "run-once-and-serve" - Run once and keep UI open

// Development mode with watch
try {
  await runEvalite({
    mode: "run-once-and-exit",
    path,
    outputPath,
  });
} catch (error) {
  console.error("Eval run failed:", error);
}
