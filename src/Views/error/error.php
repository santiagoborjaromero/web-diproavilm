<div class="row justify-content-md-center ">
    <div class="col-6 col-md-8 text-center errordiv mt-5 mb-5">
        <i class="far fa-times-circle t80 text-danger"></i>
        <br>
        <h2>Error</h2>
        <br>
        <table class="table table-striped">
            <tbody>
                <tr>
                    <td width="30%" class="text-end">Codigo</td>
                    <td class="text-start"><?PHP echo $errArr["code"]?></td>
                </tr>
                <tr>
                    <td class="text-end">Mensaje</td>
                    <td class="text-start"><?PHP echo $errArr["message"]?></td>
                </tr>
                <tr>
                    <td class="text-end">Archivo</td>
                    <td class="text-start"><?PHP echo $errArr["file"]?></td>
                </tr>
                <tr>
                    <td class="text-end">Linea</td>
                    <td class="text-start"><?PHP echo $errArr["line"]?></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<link rel="stylesheet" href="src/Views/error/error.css">