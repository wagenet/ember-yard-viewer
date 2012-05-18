YardViewer = Ember.Application.create({

  load: function(data) {
    data["@graph"].forEach(function(item) {
      if (item.type === 'module') {
        var module = YardViewer.Module.create(item);
        YardViewer.modulesController.pushObject(module);
      }
    });
  }

});

YardViewer.Module = Ember.Object.extend();

YardViewer.modulesController = Ember.ArrayProxy.create({
  content: []
});
