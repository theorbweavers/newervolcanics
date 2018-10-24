module.exports = contentTypes = [
  {
    name: 'page',
    graphName: 'allContentfulPage',
    path: '',
    template: './src/templates/page.js',
    templateBase: './src/templates/',
  },
  {
    name: 'post',
    graphName: 'allContentfulPost',
    path: '/news',
    template: './src/templates/post.js',
  },
  {
    name: 'release',
    graphName: 'allContentfulRelease',
    path: '/release',
    template: './src/templates/release.js',
  },
  {
    name: 'recording',
    graphName: 'allContentfulRecording',
    path: '/recording',
    template: './src/templates/recording.js',
  },
  {
    name: 'person',
    graphName: 'allContentfulPerson',
    path: '/person',
    template: './src/templates/person.js',
  },
];
