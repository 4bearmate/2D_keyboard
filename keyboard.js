<script>
$(document).ready(function() {
    if (typeof Hangul === "undefined") {
        console.error("Hangul.js가 로드되지 않았습니다!");
        return;
    }
    console.log("Hangul.js가 정상적으로 로드되었습니다.");

    var inputFields = ["#mb_name", "#mb_company"]; 
    var hangulBuffer = {}; 

    inputFields.forEach(function(selector) {
        var $input = $(selector);
        hangulBuffer[selector] = [];

        $input.keyboard({
            layout: 'custom',
            customLayout: {
                'default': [
                    "ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ {bksp}",
                    "ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ",
                    "ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ {shift}",
                    "{space} {alt} {accept}"
                ],
                'shift': [
                    "ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅕ ㅑ ㅒ ㅖ {bksp}",
                    "ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ",
                    "ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ {shift}",
                    "{space} {alt} {accept}"
                ],
                'alt': [
                    "1 2 3 4 5 6 7 8 9 0 {bksp}",
                    "q w e r t y u i o p",
                    "a s d f g h j k l",
                    "z x c v b n m",
                    "{space} {alt} {accept}"
                ]
            },
			shiftActive: true,
            usePreview: false,
            autoAccept: true,
            openOn: "focus",
            stayOpen: false,
            reposition: true,
            display: {
                'bksp': '←',
                'accept': '확인',
                'shift': 'Shift',
                'alt': '한/영'
            }
        })
        .on('keyboardChange', function(e, keyboard, el) {
            var inputVal = keyboard.$preview.val();
            var char = keyboard.last.key;
            
            if (char && char.length === 1) {
                hangulBuffer[selector].push(char);
                var composed = Hangul.assemble(hangulBuffer[selector]);
                keyboard.$preview.val(composed);
            }
			if (keyboard.options.layout === 'shift' && keyboard.shiftActive) {
                keyboard.setOptions({ layout: 'alt' }); // 'switchInput' 대신 'setOptions' 사용
            }
        })
        .on('keyboardHidden', function(e, keyboard, el) {
            hangulBuffer[selector] = [];
        });
    });
});
$('.keyboard-input').keyboard({
    position: {
        of: null, // 입력 필드 기준
        my: 'center top', // 키보드의 기준점 (가운데 위쪽)
        at: 'center bottom', // 입력 필드의 기준점 (가운데 아래쪽)
        collision: 'fit fit'
    },
    reposition: true // 화면 크기 변경 시 자동 조정
});
</script>
