<?php

defined('TYPO3') || die();

if (\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::isLoaded('iconpack')) {
    \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
        \Quellenform\Iconpack\IconpackRegistry::class
    )->registerIconpack(
        'EXT:iconpack_material/Configuration/Iconpack/Material4.yaml',
        \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
            \TYPO3\CMS\Core\Configuration\ExtensionConfiguration::class
        )->get('iconpack_material', 'configFile'),
        \Quellenform\IconpackMaterial\Configuration\IconpackConfiguration::class
    );
}
