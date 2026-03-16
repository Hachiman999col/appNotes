package com.myapp.data.database
import android.content.ContentValues
import android.content.Context
import android.database.Cursor
import android.database.sqlite.SQLiteDatabase
import java.time.LocalDate
class FolderDao(context: Context) {
    private val dbHelper = NotesDatabaseHelper(context)

    //---- get
    fun getAllFolders(): Cursor{
        val db = dbHelper.readableDatabase
        return db.rawQuery("SELECT * FROM FOLDER ORDER BY id DESC", null)
    }

    fun getFolderById(id: Int): Cursor {
        val db = dbHelper.readableDatabase
        return db.rawQuery("SELECT * FROM FOLDER WHERE id = ? ORDER BY id DESC", arrayOf(id.toString()))
    }

    fun getFolderByTitle(title: String): Cursor {
        val db = dbHelper.readableDatabase
        return db.rawQuery("SELECT * FROM FOLDER WHERE title = ? ORDER BY id DESC", arrayOf(title))
    }
    //--- insert
    fun insertFolder(title: String, icon: String, date: String, color: String): Long {
        val db: SQLiteDatabase = dbHelper.writableDatabase

        val values = ContentValues().apply {
            put("title", title)
            put("icon", icon)
            put("dateCreated", date)
            put("color", color)
        }
        return db.insert("FOLDER", null, values)
    }
    //--- updates

    fun updateFolder(id: Int, title: String, icon: String, color: String): Int {
        val db = dbHelper.writableDatabase
        val values = ContentValues().apply {
            put("title", title)
            put("icon", icon)

            put("color", color)
        }

        return db.update("FOLDER", values, "id = ?", arrayOf(id.toString()))
    }

    //--- deletes
    fun deleteFolder(id: Int): Int {
        val db = dbHelper.writableDatabase
        val data =  db.delete("FOLDER", "id = ?", arrayOf(id.toString()))

 return data

    }

  fun deleteAllFolders(): Int {
    val db = dbHelper.writableDatabase
    
  
    val deletedCount = db.delete("FOLDER", null, null)
    
    
    db.execSQL("DELETE FROM sqlite_sequence WHERE name='FOLDER'")

  
    val values = ContentValues().apply {
        put("title", "Default")
        put("icon", "folder")
        put("dateCreated", LocalDate.now().toString()) 
        put("color", "cardBlue")
    }
    db.insert("FOLDER", null, values)
    
    return deletedCount
}

}