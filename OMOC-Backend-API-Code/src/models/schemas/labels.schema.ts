import { Schema } from 'mongoose';
import { ITexts } from '../../interfaces';

export const textSchema = new Schema<ITexts>({
  zIndex: {
    type: Number,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },

  fontSize: {
    type: Number,
    required: false,
  },

  text: {
    type: String,
    required: false,
  },

  textAlign: {
    type: String,
    required: false,
  },

  textBg: {
    type: Boolean,
    required: false,
  },

  x: {
    type: Number,
    required: false,
  },

  y: {
    type: Number,
    required: false,
  },

  height: {
    type: Number,
    required: false,
  },

  width: {
    type: Number,
    required: false,
  },

  ratio: {
    type: Number,
    required: false,
  },
});

export const labelsSchema = new Schema({
  zIndex: Number,
  x: Number,
  y: Number,
  fontSize: Number,
  height: Number,
  width: Number,
  ratio: Number,
  text: String,
  type: String,
});
