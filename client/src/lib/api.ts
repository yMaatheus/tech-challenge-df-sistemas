import ky from 'ky';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333/v1'

export const api = ky.create({
  prefixUrl: API_URL,
});