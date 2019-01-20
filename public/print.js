let date = new Date();

function PrintElem(elem,year,misc,tuition,downpayment,others,total,premid,mid,prefinal,final)
{
    var mywindow = window.open('', 'PRINT','height=400,width=600');

    mywindow.document.write('<html><head>');
    mywindow.document.write('<link rel="stylesheet" href="print.css" type="text/css" />'); 
    // mywindow.document.write('<title style="text-align:center;">Statement of Accounts</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(
        `<div style="float:left;">Name: ${document.getElementById(elem).innerHTML}</div> <div style="float:right">Course & Year :BS ${document.getElementById('course').innerHTML} ${year}</div><br> 
    <div style="float:left";>Student#:${document.getElementById('studentid').innerHTML}</div><div style="float:right;">Scholarship: -no Scholarshipt </div><br>
    <div style="text-align:center" ><h2>Statement of Account</h2> <br> as of ${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}</div><br>
    <div>Misc Fee:${misc}</div><br>
    <div>Tuition Fee:${tuition}</div><br>
    <div>Other Fees:${others}</div><br>
    <div>Total:${total}</div><br><br><br>
    <div>Downpayment:${downpayment}</div><br>
    <div>Premid --- ${premid}</div><br>
    <div>Midterm --- ${mid}</div><br>
    <div>Prefinal --- ${prefinal}</div><br>
    <div>Final --- ${final}</div><br>
    <hr>
    `);
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    setTimeout(()=>{
        mywindow.print();
        mywindow.close();
        
    },100) ;
    

    return true;
}