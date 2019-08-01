module.exports = async function (context, myBlob) {
    context.log("JavaScript blob trigger function processed blob \n Name:", context.bindingData.name, "\n Blob Size:", myBlob.length, "Bytes");
    var dataStr = String(myBlob);

    var relatedItems = [];
    var arrlen = 0;
    const csv = require('csvtojson');
    try {
      await csv()
        .fromString(dataStr)
        .then((jsonArr)=>{ 
            // context.log(csvLine) // => From string to json row
            arrlen = jsonArr.length;
            for (var i=0; i < arrlen; i++) {
              var tobj = new Object();
              tobj.ResourceGroup = jsonArr[i].ResourceGroup;
              tobj.Quantity = jsonArr[i].UsageQuantity;
              tobj.Rate = jsonArr[i].ResourceRate;
              tobj.Cost = jsonArr[i].PreTaxCost;
              var relatedItem = new Object();
              relatedItem.costItem = tobj;
              relatedItems.push(relatedItem);
            };
            context.log("----------------------");
            // console.log(tobjs);
            context.log("Transformed content:\n" + JSON.stringify(relatedItems));
            context.log("----------------------");
      });
      context.bindings.relatedItems = relatedItems;
      context.log("Run completed successfully. Added records=" + arrlen + ", to the CosmosDB collection.");
      context.done();
    }
    catch (err) {
      context.log("Encountered exception while processing data\nError:" + err);
    };
};
