<?php

namespace Webdis\View;

use Jenssegers\Blade\Blade;

class View {

    private $cacheFolder;

    private $viewFolder;

    public $view;

    public $blade;

    public function __construct(string $view, array $data = [], array $mergeData = [])
    {
        $this->cacheFolder = dirname(__DIR__, 2) . '/storage/cache';

        $this->viewFolder = dirname(__DIR__, 2) . '/resources/views';

        $this->blade = new Blade($this->viewFolder, $this->cacheFolder);

        $this->loadDirectives();

        $this->view = $this->blade->make($view, $data, $mergeData)->render();
    }

    public function get(){
        return $this->view;
    }

    private function loadDirectives()
    {
        $this->blade->directive('asset', function($asset){
            return "<?php echo $asset; ?>";
        });
    }

}