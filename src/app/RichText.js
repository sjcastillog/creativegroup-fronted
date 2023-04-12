import {
    EditorState,
    ContentState,
    convertToRaw,
    convertFromHTML,
  } from 'draft-js';

import redraft, { createStylesRenderer, createBlockRenderer } from 'redraft';
import { StyleSheet, View, Text, Link } from '@react-pdf/renderer';
import React from 'react';

    

    const RichText = ({ note }) => {
        
        const blocksFromHTML = convertFromHTML(note);
        const initialState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
        );
        console.log(initialState)
        const editorState = EditorState.createWithContent(initialState);
        console.log(editorState)
        const rawContent = convertToRaw(editorState.getCurrentContent());
        //console.log(rawContent);
        const styles = StyleSheet.create({
            headingOne: {
            marginBottom: 4,
            color: '#3a4b56',
            fontWeight: 700,
            fontFamily: 'Public Sans',
            lineHeight: 1.35,
            fontSize: 12,
            },
        });
    
        const HeadingOne = ({ children }) => {
            return (
            <View>
                <Text style={styles.headingOne} >{children}</Text>
            </View>
            );
        };
    
        const renderers = {
            inline: {
                BOLD: (children, { key }) => {
                    return (
                    <Text key={`bold-${key}`} style={{ fontWeight: 'ultrabold'}}>
                        {children}
                    </Text>
                    );
                },
                ITALIC: (children, { key }) => {
                    return (
                    <Text key={`italic-${key}`} style={{ fontStyle: 'italic' }}>
                        {children}
                    </Text>
                    );
                },
                UNDERLINE: (children, { key }) => {
                    return (
                    <Text key={`underline-${key}`} style={{ textDecoration: 'underline' }}>
                        {children}
                    </Text>
                    );
                },
            },
            blocks: {

            unstyled: (children, { keys }) => {
                //console.log(children)
                return children.map((child, index) => {
                    //console.log(index)
                return (
                    <View key={keys[index]}>
                        <Text wrap style={styles.text}>{child}</Text>
                    </View>
                );
                });
            },
            'header-one': (children, { keys }) => {
                return children.map((child, index) => {
                return <HeadingOne key={keys[index]}>{child}</HeadingOne>;
                });
            },
            'unordered-list-item': (children, { depth, keys }) => {
                return (
                <View key={keys[keys.length - 1]} depth={depth}>
                    {children.map((child, index) => (
                        <View style={{display:'flex', flexDirection:'row'}} key={keys[index]}>
                            <Text>
                            {'• '}
                            </Text>
                            <Text key={keys[index]}>
                                {(child.toString().split(',')).slice(1)}
                            </Text>
                        </View>
                    ))}
                </View>
                );
            },
            'ordered-list-item': (children, { depth, keys }) => {
                return (
                <View key={keys.join('|')} depth={depth}>
                    {children.map((child, index) => (
                        <Text key={keys[index]} >
                                {`${index + 1}. ${child}`}                            
                        </Text>
                    
                    ))}
                </View>
                );
            },
            },

            entities: {
                LINK: (children, data, { key }) => (
                    <Link key={key} src={data.url}>
                    {children}
                    </Link>
                ),
            },
        };


       //return redraft(rawContent, renderes);
        return redraft(rawContent, renderers, { blockFallback: 'unstyled' });
    };

  export default RichText;