<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider;

return [
    'ext-iconpack' => [
        'provider' => SvgIconProvider::class,
        'source' => 'EXT:iconpack_material/Resources/Public/Icons/Extension.svg'
    ]
];
