# Powershell up through 7.03 continues to have an issue with calling
# Remove-Item -Recurse 
# on folders that live in a OneDrive folder. The following code
# is functionally equivalent to Remove-Item and does not suffer
# from the bug.
function deleteFolder($folderName){
    $directories = Get-ChildItem $folderName -Directory

    Write-Host "Deleting folder $folderName"
    foreach($dir in $directories){
        deleteFolder($dir.FullName)
    }

    $files = Get-ChildItem $folderName -File

    foreach ($file in $files){
        Remove-Item $file.FullName
    }

    Remove-Item $folderName
}

$current_dir=(Get-Location).Path

$generated_code_dir="${current_dir}/../sdk/"
$meter_path="${generated_code_dir}/meter"
$saas_path="${generated_code_dir}/saas"
$sdk_path="../sdk/"

if (Test-Path -Path $generated_code_dir -PathType Container)
{
    Write-Host "Cleaning out previously generated files"
    if ($true -eq (Test-Path -Path $meter_path -PathType Container))
    {
        Write-Host "Clearing out $meter_path"
        deleteFolder($meter_path)
    }
    if ($true -eq (Test-Path -Path $saas_path -PathType Container))
    {
        Write-Host "Clearing out $saas_path"
        deleteFolder($saas_path)
    }
}

#return

autorest `
     --typescript `
     .\saas.md `
     --add-credentials `
     --verbose `
     --clear-output-folder=true `
     --public-clients=true `
     --license-header=MICROSOFT_MIT_NO_VERSION `
     --use=@autorest/typescript@6.0.0-alpha.20210309.1 `
     --generate-metadata=true `
     --package-name=microsoft.marketplace.saas `
     --package-version=1.0.0 `
     --typescript-sdks-folder=.\temp\saas
     
autorest `
     --typescript `
     .\metering.md `
     --add-credentials `
     --verbose `
     --clear-output-folder=true `
     --public-clients=true `
     --license-header=MICROSOFT_MIT_NO_VERSION `
     --use=@autorest/typescript@6.0.0-alpha.20210309.1 `
     --generate-metadata=true `
     --package-name=microsoft.marketplace.metering `
     --package-version=1.0.0 `
     --typescript-sdks-folder=.\temp\metering

cp -r ./temp/* ../ -Force

# pushd ../metering

# npm install
# npm run-script build

# popd

# pushd ../saas

# npm install
# npm run-script build

# popd
