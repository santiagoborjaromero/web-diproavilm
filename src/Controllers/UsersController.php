<?PHP


class UsersController{

    function users($args){
        $view = "users";
        extract($args);
        require(__DIR__ . "/../Views/{$view}/{$view}.php");
    }

    function roles($args){
        $view = "roles";
        extract($args);
        require(__DIR__ . "/../Views/{$view}/{$view}.php");
    }

}