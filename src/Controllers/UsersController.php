<?PHP


class UsersController{

    function users($args){
        $view = "users";
        extract($args);
        require(__DIR__ . "/../Views/{$view}/{$view}.php");
    }

}