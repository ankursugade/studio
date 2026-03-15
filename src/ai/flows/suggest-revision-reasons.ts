'use server';
/**
 * @fileOverview An AI agent that suggests common revision reasons for project stage transitions.
 *
 * - suggestRevisionReasons - A function that suggests revision reasons based on stage transition and project context.
 * - SuggestRevisionReasonsInput - The input type for the suggestRevisionReasons function.
 * - SuggestRevisionReasonsOutput - The return type for the suggestRevisionReasons function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRevisionReasonsInputSchema = z.object({
  fromStage: z
    .string()
    .describe("The stage the project is moving from (e.g., 'Design', 'Procurement')."),
  toStage: z
    .string()
    .describe("The stage the project is moving to (e.g., 'Design', 'Procurement')."),
  projectDetails: z
    .string()
    .describe(
      "A summary of the project details and current status, helping to contextualize revision reasons."
    ),
});
export type SuggestRevisionReasonsInput = z.infer<
  typeof SuggestRevisionReasonsInputSchema
>;

const SuggestRevisionReasonsOutputSchema = z.object({
  reasons: z
    .array(z.string())
    .describe(
      'A list of common, concise revision reasons relevant to the stage transition and project context.'
    ),
});
export type SuggestRevisionReasonsOutput = z.infer<
  typeof SuggestRevisionReasonsOutputSchema
>;

export async function suggestRevisionReasons(
  input: SuggestRevisionReasonsInput
): Promise<SuggestRevisionReasonsOutput> {
  return suggestRevisionReasonsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRevisionReasonsPrompt',
  input: {schema: SuggestRevisionReasonsInputSchema},
  output: {schema: SuggestRevisionReasonsOutputSchema},
  prompt: `You are an expert Quantity Surveyor helping team members document reasons for moving a project backward in its workflow.

Given the following project details and the stage transition, suggest 3-5 common and concise revision reasons.
Consider the typical issues that might arise when a project moves from '{{{fromStage}}}' back to '{{{toStage}}}'.

Project Details: {{{projectDetails}}}

Stage Transition: From {{{fromStage}}} to {{{toStage}}}

Suggested Revision Reasons:`,
});

const suggestRevisionReasonsFlow = ai.defineFlow(
  {
    name: 'suggestRevisionReasonsFlow',
    inputSchema: SuggestRevisionReasonsInputSchema,
    outputSchema: SuggestRevisionReasonsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
