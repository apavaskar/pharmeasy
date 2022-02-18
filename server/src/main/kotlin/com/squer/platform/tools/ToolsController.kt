package com.squer.platform.tools

import com.squer.platform.tools.MapperGenerator

class ToolsController {
    companion object {

        @JvmStatic
        fun main(args: Array<String>) {
            MapperGenerator().generate(args[0], args[1], args[2])
        }
    }
}
