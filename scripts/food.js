(function(module) {
  function Inspection (options) {
    Object.keys(options).forEach(function(element, index, keys){
      this[element] = options[element];
    },this);
  }
  Inspection.all =[];

  Inspection.requestInspectionData = function(callback) {
    // $.get('https://data.kingcounty.gov/resource/gkhn-e8mn.json')
    //   .done(function(data, message, xhr) {
    //     inspection.all = data;
    //   }).done(callback);
    $.get('https://data.kingcounty.gov/resource/gkhn-e8mn.json?$select=name,inspection_date,inspection_score,address&$order=inspection_date%20DESC&inspection_type=Routine%20Inspection/Field%20Review&name=' + restName + '&$limit=1')
      .done(function(data, message, xhr) {
        Inspection.all = data;
        data.forEach(function (item) {
          var total = new Inspection(item);
          console.log(item);
          total.insertData();
        });
      }).done(callback);
  };

  Inspection.with = function(attr) {
    console.log('inspection function');
    return Inspection.all.filter(function(inspection){
      return inspection[attr];
      console.log(Inspection.all);
    });
  };

  Inspection.requestInspectionData(Inspection.with);
  module.inspection = inspection;
})(window);
