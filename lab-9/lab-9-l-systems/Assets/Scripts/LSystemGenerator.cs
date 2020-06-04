// Code taken from L-Systems Tutorial by Richard Hawkes:
// https://youtu.be/uBEA6VSUybk

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LSystemGenerator : MonoBehaviour
{
    private string currentString;
    private string axiom = "A";
    private Dictionary<char, string> rules = new Dictionary<char, string>();
    // Start is called before the first frame update
    void Start()
    {
        currentString = axiom;
        rules.Add('A', "AB");
        rules.Add('B', "A");

        Generate();
        Generate();
        Generate();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void Generate()
    {
        string modifiedString = "";

        char[] currentStringAsChars = currentString.ToCharArray();
        for(int i = 0; i < currentStringAsChars.Length; i++)
        {
            modifiedString += rules[currentStringAsChars[i]];
        }

        currentString = modifiedString;
        Debug.Log(currentString);
    }
}
