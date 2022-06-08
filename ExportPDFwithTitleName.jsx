var idoc = app.activeDocument;
var ds = idoc.dataSets;
var original_file = idoc.fullName;

//loop all the dataset
for (i=0; i<ds.length; i++) {

    ds[i].display(); // this is the same as clicking the dataset arrows in the UI

    // set the default size to 6
    idoc.layers["Body"].textFrames[0].textRange.characterAttributes.size = 6;

    // then reduce if it's oversized
    reduceSizeOfOversetText(idoc.layers["Body"].textFrames[0]);
    app.redraw(); // we don't need to redraw, it's here so you can see as they change

    savePDF();
}

// close PDF and open the original file
idoc.close ();
app.open (File (original_file));

function reduceSizeOfOversetText(t) {
    var d;
    while (
        d = t.duplicate(),
        d.name = 'temp',
        d.convertAreaObjectToPointObject(),
        d = t.parent.textFrames['temp'],
        d.contents.replace(/[\x03\r]/g, '') !== t.contents.replace(/[\x03\r]/g, '')
    ) {

        d.remove();    
        t.textRange.characterAttributes.size -= 0.2;
    }
    d.remove();
}

// save PDF with name of sublayer in Title layer
function savePDF() {   

    var title = idoc.layers["Title"].textFrames[0].contents;
    var orders = idoc.layers["Orders"].textFrames[0].contents;
    var JAN = idoc.layers["JAN"].textFrames[0].contents;

    var address = "‪/C/Users/adipr/" + JAN +  " " + title + " " + orders;
    var file1 = new File(address);
    var PDF = new PDFSaveOptions;
    idoc.saveAs(file1, PDF);

}

