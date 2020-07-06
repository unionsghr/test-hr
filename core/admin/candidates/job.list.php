<div class="row">
    <div class="col-md-1 col-xs-1">

    </div>
    <div class="col-md-10 col-xs-10">

        <div id="Job Details" class="reviewBlock entry" data-content="List" style="padding-top:10px;margin-top:10px;">

            <section class="job-content-header">
                <h1><?=\Classes\SettingsManager::getInstance()->getSetting('Company: Name')?> <small>Open Positions</small></h1>
            </section>

            <table class="table table-striped">
                <thead>
                <tr>
                    <th>Job Title</th>
                    <th>Country</th>
                    <th style="width: 50%;"></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <?php foreach($jobsArr as $j){ ?>
                    <tr>
                        <td><?=$j->title?></td>
                        <td><?=$j->country_Name?></td>
                        <td><?=$j->shortDescription?></td>
                        <td><a target="_blank" class="btn btn-small btn-primary" href="<?=CLIENT_BASE_URL?>entry.php?g=admin&n=candidates&ref=<?=$j->code?>">View Details</a></td>
                    </tr>
                <?php }?>
                </tbody>
            </table>


        </div>

    </div>

</div>
<div class="col-md-1 col-xs-1"></div>
<div class="row">
