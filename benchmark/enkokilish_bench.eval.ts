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

    return result;
  },
  scorers: [
    {
      scorer: ({ output, expected }) =>
        contains({
          actual: output.text,
          expected: expected,
        }),
    },
  ],
  columns: async (result) => {
    return [
      {
        label: "Input",
        value: result.input,
      },
      {
        label: "Output",
        value: result.output.text,
      },
      {
        label: "Expected",
        value: result.expected,
      },
      {
        label: "InTok",
        value: result.output.usage.inputTokens || 0,
      },
      {
        label: "OutTok",
        value: result.output.usage.outputTokens || 0,
      },
      {
        label: "TotTok",
        value: result.output.usage.totalTokens || 0,
      },
      {
        label: "Cost",
        value: result.output.providerMetadata?.["gateway"]["marketCost"],
      },
    ];
  },
  // trialCount: 5,  // Run each data point 5 times
});
