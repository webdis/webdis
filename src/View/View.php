<?php

namespace Webdis\View;

use Jenssegers\Blade\Blade;
use Webdis\Constant;

class View {

    private $cacheFolder;

    private $viewFolder;

    public $view;

    public $blade;

    public function __construct(string $view, array $data = [])
    {
        $this->cacheFolder = dirname(__DIR__, 2) . '/storage/cache/views';

        $this->viewFolder = dirname(__DIR__, 2) . '/resources/views';

        $this->blade = new Blade($this->viewFolder, $this->cacheFolder);

        $this->loadDirectives();

        $config = $_ENV;

        $configJson = json_encode($config);

        $configObject = json_decode($configJson);

        $version = Constant::VERSION;

        $this->view = $this->blade->make($view, $data, ['config' => $configObject, 'version' => $version])->render();
    }

    public function get(){
        return $this->view;
    }

    private function loadDirectives()
    {
        $this->blade->directive('asset', function(string $asset){
            return "<?php echo $asset; ?>";
        });

        $this->blade->directive('component', function(string $location, array $data = []){
            $componentBlade = new Blade($this->viewFolder, $this->cacheFolder);

            $config = $_ENV;

            $configJson = json_encode($config);

            $configObject = json_decode($configJson);

            $version = Constant::VERSION;

            $location = str_replace('"', "", $location);
            $location = str_replace("'", "", $location);

            $location = "component.$location";

            $component = $componentBlade->render($location, $data, ['config' => $configObject, 'version' => $version]);

            return $component;
        });
    }

}