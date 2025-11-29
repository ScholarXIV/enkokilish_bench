import { evalite } from "evalite";
import { generateText } from "ai";
// import { google } from "@ai-sdk/google"; // OPTIONAL
// import { wrapAISDKModel } from "evalite/ai-sdk"; // OPTIONAL
import { contains } from "evalite/scorers/deterministic";
import { enkokilish_dataset } from "../datasets/enkokilish";
import { systemPrompt } from "../system_prompt/system_prompt";

// Import Datase
const dataset = enkokilish_dataset;

// Wrap once, use everywhere
const model = "google/gemini-2.5-flash-lite";
// const model = google("gemini-2.5-flash"); // Optionally use a provider
// const model = wrapAISDKModel(google("gemini-2.5-flash-lite")); // Wrap to get traces

// Benchmark
evalite("Enkokilish Bench", {
  data: async () => dataset,
  task: async (input) => {
    const result = await generateText({
      model: model,
      system: systemPrompt,
      prompt: input,
    });

    return result.text;
  },
  scorers: [
    {
      scorer: ({ output, expected }) =>
        contains({
          actual: output,
          expected: expected,
        }),
    },
  ],
});
