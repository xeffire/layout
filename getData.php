<?php

    $f = fopen("profile-info.txt", "r");
    $data = [];
    $export = [];
    //regex
    $id = "/^\d\./";
    $name = "/^Name:\s/";
    $address = "/^Address:\s/";
    $about = "/^About:\s/";
    $EOL = "/\r\n/";
    while (!feof($f)) {
        array_push($data, fgets($f));
    };

    $currId = 0;
    for ($i = 0; $i < count($data); $i++) {
        if(preg_match($id, $data[$i])) {
            $currId = preg_replace("/[\s\.]/", "", $data[$i]);
            $export[$currId-1] = [];
        } else if (preg_match($name, $data[$i])) {
            $export[$currId-1]['name'] = preg_replace(array($name, $EOL), "", $data[$i]);
        } else if (preg_match($address, $data[$i])) {
            $export[$currId-1]['address'] = preg_replace(array($address, $EOL), "", $data[$i]);
        } else if (preg_match($about, $data[$i])) {
            $export[$currId-1]['about'] = preg_replace(array($about, $EOL), "", $data[$i]);
        }
    };

    $dir = opendir("profile-images/");
    $index = 0;
    while(($filename = readdir($dir)) !== false) {
        if($filename !== "." && $filename !== ".."){
            $export[$index]["src"] = $filename;
            $index++;
        }
    }
    $JSON = json_encode($export);
    die($JSON);

?>