<?PHP

use Controller;

class RouterController {

    private $metodo;
    private $path;
    private $rutas;

    public function __construct() {
        $this->metodo = $_SERVER["REQUEST_METHOD"];
        $this->path = $_SERVER["REQUEST_URI"];
        // $proc_rutas = str_replace("/apidiproavilm/","",$this->path);
        $this->rutas = explode("/",$this->path);
        $this->routes();
    }

    function healthy(){
        echo Controller::formatoSalida("ok","healthy");
    }

    function noRoute(){
        echo Controller::formatoSalida("error","La ruta y metodo no existe");
    }
    
    function routes(){
        $routerList = json_decode(file_get_contents(__DIR__ . "/../../routes.json"), true);

        $found = false;
        $event = "";

        foreach($routerList as $k => &$r){
            // print( $k ) . "<br>";
            // print( $this->metodo . "|" . $this->rutas[0]). "<br>";

            if (!$found && $k == $this->metodo . "|" . $this->rutas[0]){
                $found = true;
                $event = $r;
            }
        }

        if ($event == ""){
            $this->noRoute();
            exit();
        }

        eval($event . ";");
    }




}