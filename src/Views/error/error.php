<div class="row justify-content-md-center ">
    <div class="col-6 text-center errordiv mt-5 mb-5">
        <i class="far fa-times-circle t80 text-danger"></i>
        <br>
        <h2>Error</h2>
        <br>
        <!-- var_dump($errArr["code"]) -->
        <table class="table table-striped">
            <tbody>
                <tr>
                    <th class="text-end">Codigo</th>
                    <td class="text-start"><?PHP echo $errArr["code"]?></td>
                </tr>
                <tr>
                    <th class="text-end">Mensaje</th>
                    <td class="text-start"><?PHP echo $errArr["message"]?></td>
                </tr>
                <tr>
                    <th class="text-end">Archivo</th>
                    <td class="text-start"><?PHP echo $errArr["file"]?></td>
                </tr>
                <tr>
                    <th class="text-end">Linea</th>
                    <td class="text-start"><?PHP echo $errArr["line"]?></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<link rel="stylesheet" href="src/views/error/error.css">