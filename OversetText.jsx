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

var idoc = app.activeDocument;

reduceSizeOfOversetText(idoc.layers["Body"].textFrames[0]);