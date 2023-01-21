import { APIApplicationCommandInteraction, APIInteractionResponse } from "discord-api-types/v10";
import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedFailedResponse } from "utils/error-handling";
import axios, { AxiosResponse } from "axios";

export const register = new SlashCommandBuilder()
  .setName("kanye-quote")
  .setDescription("Give's you a random kanye quotes");

export const execute = async (interaction: APIApplicationCommandInteraction): Promise<APIInteractionResponse> => {
  try {
    const { data } = (await axios.get("https://api.kanye.rest/")) as AxiosResponse<{ quote: string }>;
    return {
      type: 4,
      data: {
        embeds: [
          {
            title: data.quote || "",
            description: `- Kanye West`,
            color: 0x1d746d,
          },
        ],
      },
    };
  } catch (error) {
    return EmbedFailedResponse();
  }
};
