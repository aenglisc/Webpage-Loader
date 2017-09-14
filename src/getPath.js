import path from 'path';

export default (name, destination) => {
  const outputPath = path.resolve(destination);
  return path.join(outputPath, name);
};
