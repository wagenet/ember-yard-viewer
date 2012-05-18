YardViewer = Ember.Application.create({

  load: function(data) {
    data["@graph"].forEach(function(item) {
      switch(item.type) {
        case 'module':
          YardViewer.modulesController.createModule(item);
          break;
        case 'method':
          var module = YardViewer.modulesController.findProperty('path', item.namespace);
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

YardViewer.modulesController = Ember.ArrayProxy.create({
  content: [],

  createModule: function(data) {
    var module = YardViewer.Module.create(data);
    this.pushObject(module);
  }
});
