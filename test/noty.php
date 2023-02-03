<?php
final class Noty
{
    public static function set(?string $type = "log", ?string $text = "")
    {
        if (!isset($_SESSION['noty'])) :
            $_SESSION['noty'] = [];
        endif;
        $_SESSION['noty'][microtime()] = [
            'type' => $type,
            'text' => $text
        ];
    }
    public static function render()
    {
        if (!isset($_SESSION['noty'])) :
            return false;
        endif;
        ?>
        <script>
        <?php
        foreach ($_SESSION['noty'] as $noty){
            ?>
            noty.push({
                type: "<?php echo $noty['type']; ?>",
                text: "<?php echo $noty['text']; ?>",
                timeout: 4000,
            });
                <?php
        }
        unset($_SESSION['noty']);
        ?></script><?php
    }
}