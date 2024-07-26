<?PHP

class HomeController{
       
    static public function setPage(){
        $page = "";
        if ($_SESSION["logged"]==true){
            $page = "skeleton";
        } else {
            $page = "login";
        }
        return $page;
    }   

    // static public function login(){
    //     $pathView = __DIR__ . "/../Views/";
    //     require_once($pathView . "login.php");
    // }




}
