YardViewer = Ember.Application.create({

  load: function(data) {
    var controller = this.getPath('stateManager.modulesController');
    data["@graph"].forEach(function(item) {
      switch(item.type) {
        case 'module':
          controller.createModule(item);
          break;
        case 'method':
          var module = controller.findProperty('path', item.namespace);
          if (module) {
            module.createMethod(item);
          } else {
            console.warn("Unable to find namespace: "+item.namespace);
          }
          break;
      }
    });
  }
});

YardViewer.Router = Ember.Router.extend({
  location: 'hash',

  initialState: 'root',

  root: Ember.State.extend({
    index: Ember.State.extend({
      route: '/'
    })
  })
});

YardViewer.Module = Ember.Object.extend({
  methods: null,

  createMethod: function(data) {
    var method = YardViewer.Method.create(data);
    this.get('methods').pushObject(method);
  },

  init: function() {
    this._super();
    this.set('methods', []);
  }
});

YardViewer.Method = Ember.Object.extend();

YardViewer.ModulesController = Ember.ArrayProxy.extend({
  content: [],

  createModule: function(data) {
    var module = YardViewer.Module.create(data);
    this.pushObject(module);
  }
});

// This is a hack to make router/stateManager work like magic :)
YardViewer.registerInjection(function(namespace, stateManager, property) {
  if (property === 'Router') {
    var location = stateManager.get('location');

    if (typeof location === 'string') {
      stateManager.set('location', Ember.Location.create({style: location}));
    }

    YardViewer.set('stateManager', stateManager);
  }
});

YardViewer.initialize(YardViewer.Router.create());
