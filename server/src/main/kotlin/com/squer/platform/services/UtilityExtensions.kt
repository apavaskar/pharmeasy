package com.squer.platform.services

import org.apache.commons.codec.binary.Hex
import java.util.*
import javax.crypto.Cipher
import javax.crypto.spec.IvParameterSpec
import javax.crypto.spec.SecretKeySpec

import java.io.UnsupportedEncodingException
import java.security.MessageDigest

import java.security.NoSuchAlgorithmException
import kotlin.jvm.Throws


private const val encryptionKey = "ABCDEFGHIJKLMNOP"
private const val cipherTransformation = "AES/CBC/PKCS5PADDING"
private const val aesEncryptionAlgorithem = "AES"


fun String.encrpy(): String {
    var encryptedText = ""
    try {
        val cipher = Cipher.getInstance(cipherTransformation)
        val key: ByteArray = encryptionKey.toByteArray() //   getBytes(characterEncoding)
        val secretKey = SecretKeySpec(key, aesEncryptionAlgorithem)
        val ivparameterspec = IvParameterSpec(key)
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivparameterspec)
        val cipherText = cipher.doFinal(this.toByteArray())
        val encoder: Base64.Encoder = Base64.getEncoder()
        encryptedText = encoder.encodeToString(cipherText)
    } catch (E: Exception) {
        System.err.println("Encrypt Exception : " + E.message)
    }
    return encryptedText
}

fun String.decrypt(): String {
    var decryptedText = ""
    try {
        val cipher = Cipher.getInstance(cipherTransformation)
        val key: ByteArray = encryptionKey.toByteArray()
        val secretKey = SecretKeySpec(key, aesEncryptionAlgorithem)
        val ivparameterspec = IvParameterSpec(key)
        cipher.init(Cipher.DECRYPT_MODE, secretKey, ivparameterspec)
        val decoder = Base64.getDecoder()
        val cipherText: ByteArray = decoder.decode(this.toByteArray())
        decryptedText = String(cipher.doFinal(cipherText))
    } catch (E: java.lang.Exception) {
        System.err.println("decrypt Exception : " + E.message)
    }
    return decryptedText
}

@Throws(NoSuchAlgorithmException::class, UnsupportedEncodingException::class)
fun String.hash(): String? {
    val digest: MessageDigest = MessageDigest.getInstance("SHA-256")
    digest.reset()
    digest.update(this.toByteArray(charset("UTF-8")))
    val shaDig: ByteArray = digest.digest()
    return String(Hex.encodeHex(shaDig))
}


