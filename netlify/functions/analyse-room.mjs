import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async (request) => {
  if (request.method !== "POST") {
    return Response.json(
      {
        error: "Method not allowed",
      },
      {
        status: 405,
      }
    );
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        {
          error:
            "The OpenAI API key has not been configured.",
        },
        {
          status: 500,
        }
      );
    }

    const body = await request.json();

    const image = body.image;

    if (!image) {
      return Response.json(
        {
          error: "No image was provided.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      typeof image !== "string" ||
      !image.startsWith("data:image/")
    ) {
      return Response.json(
        {
          error:
            "The uploaded image format was not recognised.",
        },
        {
          status: 400,
        }
      );
    }

    const response =
      await client.responses.create({
        model: "gpt-5.6-luna",

        reasoning: {
          effort: "low",
        },

        input: [
          {
            role: "developer",
            content: [
              {
                type: "input_text",
                text: `
You are the Room Scan assistant inside an app called Fair Share.

Fair Share helps people reduce household mental load and executive-function demands.

Analyse the room photo and suggest practical household tasks that are reasonably supported by what can actually be seen.

Important behaviour:

- Be neutral and non-judgemental.
- Never describe the home or person as messy, dirty, lazy, chaotic, bad, embarrassing, neglected or similar.
- Do not speculate about who lives there.
- Do not identify, infer or comment on age, gender, health, disability, finances, relationships or other personal characteristics.
- Do not make assumptions about unseen areas.
- Do not invent problems you cannot reasonably see.
- Do not recommend dangerous repairs or specialist work as DIY.
- If something may need professional attention, phrase it as "check whether..." or "consider arranging..."
- Prefer specific, achievable tasks.
- Break large jobs into smaller actions.
- Include some very small tasks where appropriate.
- Avoid duplicate suggestions.
- Return between 3 and 10 suggestions depending on what is visible.
- If very little needs attention, it is fine to return only a few suggestions.
- A suggestion should help reduce decision-making, not create pressure.

Use only these categories:
Quick wins
Tidy
Clean
Organise
Maintain
Things to check

Effort should be a short human-friendly estimate such as:
2 min
5 min
5–10 min
10–15 min
15–20 min
Quick win

Do not output anything except the requested structured result.
                `.trim(),
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text:
                  "Look at this room and suggest useful household tasks that Fair Share could offer to the user.",
              },
              {
                type: "input_image",
                image_url: image,
                detail: "auto",
              },
            ],
          },
        ],

        text: {
          format: {
            type: "json_schema",
            name: "room_scan_suggestions",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                suggestions: {
                  type: "array",
                  minItems: 0,
                  maxItems: 10,
                  items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      task: {
                        type: "string",
                      },
                      category: {
                        type: "string",
                        enum: [
                          "Quick wins",
                          "Tidy",
                          "Clean",
                          "Organise",
                          "Maintain",
                          "Things to check",
                        ],
                      },
                      effort: {
                        type: "string",
                      },
                    },
                    required: [
                      "task",
                      "category",
                      "effort",
                    ],
                  },
                },
              },
              required: ["suggestions"],
            },
          },
        },
      });

    const result = JSON.parse(
      response.output_text
    );

    const suggestions =
      result.suggestions.map(
        (suggestion, index) => ({
          id: `scan-${Date.now()}-${index}`,
          task: suggestion.task,
          category:
            suggestion.category,
          effort: suggestion.effort,
        })
      );

    return Response.json({
      suggestions,
    });
  } catch (error) {
    console.error(
      "Room Scan error:",
      error
    );

    return Response.json(
      {
        error:
          "Fair Share could not analyse this room right now.",
      },
      {
        status: 500,
      }
    );
  }
};