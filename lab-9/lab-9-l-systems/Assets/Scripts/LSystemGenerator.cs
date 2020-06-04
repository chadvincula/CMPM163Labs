// Code taken from L-Systems Tutorial by Richard Hawkes:
// https://youtu.be/uBEA6VSUybk

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LSystemGenerator : MonoBehaviour
{
    [SerializeField]
    private int iterations;
    private string currentString;
    private string axiom = "F";
    private float length = 20f;
    private float angle = 25f;
    private bool isGenerating = false;
    private Dictionary<char, string> rules = new Dictionary<char, string>();
    private Stack<TransformInfo> transformStack = new Stack<TransformInfo>();
    // Start is called before the first frame update
    void Start()
    {
        currentString = axiom;
        rules.Add('F', "FF+[+F-F-F]-[-F+F+F]");
        StartCoroutine(GenerateLSystem(iterations));
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    IEnumerator GenerateLSystem(int iterations)
    {
        int count = 0;

        while(count < iterations)
        {
            if(!isGenerating)
            {
                isGenerating = true;
                Debug.Log("Generation: " + count);
                StartCoroutine(Generate());
                count++;
            }
            else
            {
                yield return new WaitForSeconds(0.1f);
            }
        }
    }

    IEnumerator Generate()
    {
        length /= 2;
        char[] currentStringAsChars = currentString.ToCharArray();
        ModifyAxiom(currentStringAsChars);
        StartCoroutine(ApplyRules(currentStringAsChars));
        yield return null;
    }

    private void ModifyAxiom(char[] axiomAsChar)
    {
        string modifiedString = "";
        // Modifying the axiom
        for(int i = 0; i < axiomAsChar.Length; i++)
        {
            if(rules.ContainsKey(axiomAsChar[i]))
            {
                modifiedString += rules[axiomAsChar[i]];
            }
            else
            {
                modifiedString += axiomAsChar[i].ToString();
            }
        }

        currentString = modifiedString;
        Debug.Log(currentString);
    }

    IEnumerator ApplyRules(char[] axiomAsChar)
    {
        // Specify the rules for the modified string
        for(int i = 0; i < axiomAsChar.Length; i++)
        {
            if(axiomAsChar[i] == 'F')
            {
                Vector3 initialPosition = transform.position;
                transform.Translate(Vector3.up * length);
                Debug.DrawLine(initialPosition, transform.position, Color.white, 10000f, false);
                yield return null;
            }
            else if(axiomAsChar[i] == '+')
            {
                transform.Rotate(Vector3.right * angle);
            }
            else if(axiomAsChar[i] == '-')
            {
                transform.Rotate(Vector3.right * -angle);
            }
            else if(axiomAsChar[i] == '[')
            {
                TransformInfo ti = new TransformInfo();
                ti.position = transform.position;
                ti.rotation = transform.rotation;

                transformStack.Push(ti);
            }
            else if(axiomAsChar[i] == ']')
            {
                TransformInfo ti = transformStack.Pop();
                transform.position = ti.position;
                transform.rotation = ti.rotation;
            }
        }
        isGenerating = false;
        Debug.Log("Finished this generation");
    }
}
