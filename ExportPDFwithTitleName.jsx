var idoc = app.activeDocument;
var ds = idoc.dataSets;
var activeds = idoc.activeDataSet; // save the current dataset

//loop all the dataset
for (i=0; i<ds.length; i++) {

    ds[i].display(); // this is the same as clicking the dataset arrows in the UI
    app.redraw(); // we don't need to redraw, it's here so you can see as they change

    savePDF();
}

activeds.display(); // display the original active dataset

//save PDF with name of sublayer in Title layer
function savePDF() {
    var title = idoc.layers["Title"].textFrames[0].contents;
    var orders = idoc.layers["Orders"].textFrames[0].contents;
    var address = "/C/Users/adipr/" + title + " " + orders;
    var file1 = new File(address);
    var PDF = new PDFSaveOptions;
    idoc.saveAs(file1, PDF);
}

