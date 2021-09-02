import './entry';

(module as any).hot.accept('./entry', () => {
  console.log('HMR done!');
});
