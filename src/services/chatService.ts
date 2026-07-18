import { apiClient } from './apiClient';

import type {
  ChatPayload,
  ChatResponse,
} from '../types';

export const chatService = {

  async sendMessage(
    payload: ChatPayload,
  ): Promise<ChatResponse> {

    console.log(
      'Sending chat request:',
      payload,
    );

    const response =
      await apiClient.post<ChatResponse>(
        '/chat',
        payload,
      );

    console.log(
      'Chat response:',
      response.data,
    );

    return response.data;
  },

};