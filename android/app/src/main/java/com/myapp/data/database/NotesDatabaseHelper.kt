package com.myapp.data.database
import java.time.LocalDate
import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper

class NotesDatabaseHelper(context: Context) : SQLiteOpenHelper(context, "Notas.db", null, 1) {

    override fun onCreate(db: SQLiteDatabase) {

        db.execSQL("""
            CREATE TABLE IF NOT EXISTS NOTAS (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                title TEXT, 
                content TEXT, 
                dateCreated TEXT, 
                folder TEXT
            )
        """.trimIndent())


        db.execSQL("""
            CREATE TABLE IF NOT EXISTS FOLDER (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                title TEXT, 
                icon TEXT, 
                dateCreated TEXT, 
                color TEXT
            )
        """.trimIndent())

        db.execSQL("""
        INSERT INTO FOLDER (title, icon, dateCreated, color) 
        VALUES ('Default', 'folder', '${LocalDate.now()}', 'cardBlue')
    """.trimIndent())
    }

    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {

        db.execSQL("DROP TABLE IF EXISTS NOTAS")
        db.execSQL("DROP TABLE IF EXISTS FOLDER")
        onCreate(db)
    }
}