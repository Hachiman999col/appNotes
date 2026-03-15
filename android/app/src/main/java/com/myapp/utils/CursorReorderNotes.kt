package com.myapp.utils

import android.database.Cursor
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap


object CursorReorderNotes {
    fun reorderCursorNote(cursor: Cursor?): WritableArray {
        val result = Arguments.createArray()

        if (cursor != null && cursor.moveToFirst()) {
            do {
                val row: WritableMap = Arguments.createMap()

                row.putInt("id", getIntFromColumn(cursor, "id"))
                row.putString("title", getStringFromColumn(cursor, "title"))
                row.putString("content", getStringFromColumn(cursor, "content"))
                row.putString("dateCreated", getStringFromColumn(cursor, "dateCreated"))
                row.putString("folder", getStringFromColumn(cursor, "folder"))

                result.pushMap(row)
            } while (cursor.moveToNext())
        }

        cursor?.close()
        return result

    }
    fun reorderCursorNotesWithFolder(cursor: Cursor?): WritableArray {
        val result = Arguments.createArray()

        if (cursor != null && cursor.moveToFirst()) {
            do {
                val row: WritableMap = Arguments.createMap()

                row.putInt("id", getIntFromColumn(cursor, "id"))
                row.putString("title", getStringFromColumn(cursor, "title"))
                row.putString("content", getStringFromColumn(cursor, "content"))
                row.putString("folder", getStringFromColumn(cursor, "folder"))
                row.putString("dateCreated", getStringFromColumn(cursor, "dateCreated"))
                row.putString("folderColor", getStringFromColumn(cursor, "folderColor"))
                row.putString("folderIcon", getStringFromColumn(cursor, "folderIcon"))

                result.pushMap(row)
            } while (cursor.moveToNext())
        }

        cursor?.close()
        return result

    }
    fun reorderNoteCount(cursor: Cursor?): WritableArray {
        val result = Arguments.createArray()

        if (cursor != null && cursor.moveToFirst()) {
            do {
                val row = Arguments.createMap()

                row.putString("folder", cursor.getString(cursor.getColumnIndexOrThrow("folder")))

                row.putInt("count", cursor.getInt(cursor.getColumnIndexOrThrow("total")))

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

