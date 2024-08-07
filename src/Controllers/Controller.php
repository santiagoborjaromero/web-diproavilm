<?php

class Controller {
    
    //TODO: metodo para codificar la informacion
    static public function encode($texto){
        return openssl_encrypt($texto, "AES-256-CBC", "6UG8key@Un14nd3s", 0);
    }
    
    //TODO: metodo para decodificar la informacion
    static public function decode($texto){
        return openssl_decrypt($texto, "AES-256-CBC", "6UG8key@Un14nd3s", 0 );
    }
   
}