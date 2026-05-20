import fs from 'fs';
import path from 'path';
import * as babel from '@babel/core';

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  try {
    babel.parseSync(content, {
      filename: filePath,
      presets: [
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'automatic' }]
      ]
    });
  } catch (err) {
    console.error('Error in', filePath);
    console.error(err.message);
  }
}

const dir = path.join(__dirname, '../src/app');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
files.forEach(f => checkFile(path.join(dir, f)));

const compDir = path.join(__dirname, '../src/app/components');
const compFiles = fs.readdirSync(compDir).filter(f => f.endsWith('.tsx'));
compFiles.forEach(f => checkFile(path.join(compDir, f)));
