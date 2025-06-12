#!/bin/bash

# 获取脚本所在目录的绝对路径
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

echo "⚡ INITIATING LULU DASHBOARD PREVIEW PROTOCOL..."
echo "📡 Vault-Tec Terminal Location: $SCRIPT_DIR"

# 进入 app 目录
cd "$SCRIPT_DIR/app"

# 检查是否存在 node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 DOWNLOADING RESOURCE PACKAGES... Please stand by."
    npm install
fi

# 检查是否存在 dist 目录（构建产物）
if [ ! -d "dist" ]; then
    echo "🔧 COMPILING PROJECT DATA... Reactor online."
    npm run build
fi

echo ""
echo "🖥️  PREPARING BROWSER WORKSTATION..."

# 函数：检测并切换到浏览器桌面
prepare_browser_desktop() {
    echo "🔍 SCANNING FOR ACTIVE BROWSER PROCESSES..."
    
    # 使用 AppleScript 检测浏览器并切换桌面
    local browser_found=$(osascript << 'EOF'
    tell application "System Events"
        set browserApps to {"Safari", "Google Chrome", "Firefox", "Microsoft Edge", "Arc", "Brave Browser", "Opera"}
        set foundBrowser to false
        set targetBrowser to ""
        
        -- 找到当前运行的浏览器
        repeat with browserName in browserApps
            try
                if exists (process browserName) then
                    set targetBrowser to browserName
                    set foundBrowser to true
                    exit repeat
                end if
            end try
        end repeat
        
        if foundBrowser then
            try
                -- 切换到浏览器桌面
                tell application targetBrowser
                    activate
                    delay 0.3
                end tell
                
                -- 确保浏览器窗口在前台
                tell process targetBrowser
                    set frontmost to true
                    try
                        set browserWindow to first window
                        perform action "AXRaise" of browserWindow
                    end try
                end tell
                
                return targetBrowser
                
            on error errMsg
                return "error"
            end try
        else
            return "not_found"
        end if
    end tell
EOF
)
    
    if [ "$browser_found" = "not_found" ]; then
        echo "⚠️  NO ACTIVE BROWSER DETECTED. Initiating emergency protocol..."
        # 先打开一个浏览器窗口
        open "http://about:blank" 2>/dev/null
        sleep 2
        
        # 再次尝试检测
        browser_found=$(osascript << 'EOF'
        tell application "System Events"
            set browserApps to {"Safari", "Google Chrome", "Firefox", "Microsoft Edge", "Arc", "Brave Browser", "Opera"}
            repeat with browserName in browserApps
                try
                    if exists (process browserName) then
                        tell application browserName to activate
                        return browserName
                    end if
                end try
            end repeat
            return "still_not_found"
        end tell
EOF
)
    fi
    
    if [ "$browser_found" = "error" ]; then
        echo "⚠️  SECURITY CLEARANCE REQUIRED: Terminal access privileges needed"
        echo "💡 Navigate to: System Preferences > Security & Privacy > Accessibility"
        echo "   Grant Terminal.app security clearance for vault operations"
        echo "🔄 First run may trigger Vault-Tec authorization dialog - APPROVE access"
        echo ""
    elif [ "$browser_found" != "still_not_found" ] && [ "$browser_found" != "not_found" ]; then
        echo "✅ WORKSTATION SYNCHRONIZED: Switched to $browser_found terminal"
    else
        echo "⚠️  BROWSER SCAN UNSUCCESSFUL. Preview server will proceed anyway."
    fi
    
    echo ""
}

# 执行浏览器桌面准备
prepare_browser_desktop

# 启动预览服务器
echo "🌐 ACTIVATING PREVIEW SERVER REACTOR..."
echo "💡 Dashboard will materialize in current browser window"
echo "🔗 Access Terminal: http://localhost:4173"
echo ""

# 启动预览服务器（非后台模式，这样可以直接看到输出）
echo "🎯 REACTOR CORE ONLINE... Please stand by."
echo "⏹️  Press Ctrl+C to initiate emergency shutdown"
echo ""

# 捕获 Ctrl+C 信号
trap 'echo ""; echo "🛑 EMERGENCY SHUTDOWN INITIATED..."; echo "🏁 Preview server reactor offline. Have a pleasant day."; exit 0' INT

# 启动预览服务器
npm run preview 