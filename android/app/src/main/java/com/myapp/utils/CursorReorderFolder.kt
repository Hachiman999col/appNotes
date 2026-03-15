package com.myapp.utils

import android.database.Cursor
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap


object CursorReorderFolder {

    fun reorderFolder(cursor: Cursor?): WritableArray {
        val result = Arguments.createArray()
        if (cursor != null && cursor.moveToFirst()) {
            do {
                val row: WritableMap = Arguments.createMap()

                row.putInt("id", getIntFromColumn(cursor, "id"))
                row.putString("title", getStringFromColumn(cursor, "title"))
                row.putString("icon", getStringFromColumn(cursor, "icon"))
                row.putString("dateCreated", getStringFromColumn(cursor, "dateCreated"))
                row.putString("color", getStringFromColumn(cursor, "color"))

                result.pushMap(row)
            } while (cursor.moveToNext())
        }
        cursor?.close()
        return result
    }
    private fun getStringFromColumn(cursor: Cursor, columnName: String): String {
        val index = cursor.getColumnIndex(columnName)
        return if (index != -1) cursor.getString(index) else ""
    }

    private fun getIntFromColumn(cursor: Cursor, columnName: String): Int {
        val index = cursor.getColumnIndex(columnName)
        return if (index != -1) cursor.getInt(index) else 0
    }
}